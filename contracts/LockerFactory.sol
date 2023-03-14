// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./Locker.sol";
import "./provable/provableAPI.sol";

contract LockerFactory is usingProvable {
    uint256 public counter;
    uint256 numberOfLockers;
    bool public isAlive = true;
    address public contractOwner;
    mapping(uint256 => Locker) public lockers;

    constructor() {
        contractOwner = msg.sender;
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
        Locker locker = new Locker(_name, msg.sender, _beneficiary);
        // Add mapping
        lockers[numberOfLockers] = locker;
        numberOfLockers++;
        // emit new locker event
        emit NewLocker(locker, msg.sender);
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
            getUser();
        } else {
            isAlive = false;
            counter++;
            triggerFundTransfer();
        }
        emit LogReceivedData(myid, result);
    }

    function getUser() public payable {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query was sent, standing by for the answer.."
            );
            provable_query(
                60,
                "URL",
                "json(https://spotty-areas-eat-123-231-21-215.loca.lt/api/users/63d270f77eff774e5a1ba137).isAlive"
            );
        }
    }

    receive() external payable {}
}
