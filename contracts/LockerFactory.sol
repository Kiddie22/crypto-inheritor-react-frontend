// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./Locker.sol";
import "./provable/provableAPI.sol";

contract LockerFactory is usingProvable {
    uint256 numberOfLockers;
    bool isAlive;
    bool oracleIsRunning;
    bool fundsTransferred;
    address contractOwner;
    string username;
    string nationalId;
    mapping(uint256 => Locker) public lockers;
    uint256 public counter;
    uint256 public triggerTime;

    constructor(
        address owner,
        string memory _username,
        string memory _nationalId
    ) {
        contractOwner = owner;
        isAlive = true;
        oracleIsRunning = false;
        username = _username;
        nationalId = _nationalId;
        OAR = OracleAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    event NewLocker(Locker locker, address owner);
    event LogReceivedData(bytes32 id, string data);
    event LogNewProvableQuery(string description);

    // ------------------------ User Functions ------------------------
    function getLockerByIndex(uint256 _index) public view returns (Locker) {
        return lockers[_index];
    }

    function getNumberOfLockers() public view returns (uint256) {
        return numberOfLockers;
    }

    function createNewLocker(string memory _name, address _beneficiary) public {
        Locker locker = new Locker(_name, msg.sender, _beneficiary, address(this));
        // Add mapping
        lockers[numberOfLockers] = locker;
        numberOfLockers++;
        // emit new locker event
        emit NewLocker(locker, msg.sender);
    }

    function getUsername() public view returns (string memory) {
        return username;
    }

    function getNationalId() public view returns (string memory) {
        return nationalId;
    }

    function getIsAlive() public view returns (bool) {
        return isAlive;
    }

    function getOracleIsRunning() public view returns (bool) {
        return oracleIsRunning;
    }

    function getFundsTransferred() public view returns (bool) {
        return fundsTransferred;
    }

    // ------------------------ Automated Function ------------------------
    function triggerFundTransfer() private {
        for (uint256 i = 0; i < numberOfLockers; i++) {
            lockers[i].transferFundsToBeneficiary();
        }
    }

    // ------------------------ Provable Oracle Functions ------------------------
    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != provable_cbAddress()) revert();
        if (keccak256(abi.encodePacked(result)) == keccak256("true")) {
            isAlive = true;
            counter++;
            triggerTime = 0;
            getUser();
        } else {
            if (counter > 0) {
                isAlive = false;
                triggerTime = block.timestamp + 60;
                counter = 0;
                getUser();
            } else {
                oracleIsRunning = false;
                fundsTransferred = true;
                triggerFundTransfer();
            }
        }
        emit LogReceivedData(myid, result);
    }

    function getUser() public payable {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
            oracleIsRunning = false;
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            if (oracleIsRunning == false) {
                oracleIsRunning = true;
            }
            string memory path = string.concat(
                "json(https://crypto-inheritor-backend.herokuapp.com/api/users/",
                nationalId
            );
            path = string.concat(path, ").isAlive");
            provable_query(60, "URL", path);
        }
    }

    function manualOverride() public payable {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            string memory path = string.concat(
                "json(https://crypto-inheritor-backend.herokuapp.com/api/users/override/",
                nationalId
            );
            path = string.concat(path, ").isAlive");
            provable_query("URL", path);
        }
    }

    receive() external payable {}
}
