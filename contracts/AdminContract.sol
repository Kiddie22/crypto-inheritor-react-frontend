// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./LockerFactory.sol";
import "./provable/provableAPI.sol";

contract AdminContract is usingProvable {
    mapping(string => address) public nationalIdToLockerFactoryAddress;
    mapping(address => uint256) public lockerFactoryToVerifiedCount;

    event NewLockerFactory(LockerFactory lockerFactory, address owner);
    event LogReceivedData(bytes32 id, string data);
    event LogNewProvableQuery(string description);

    function addToMapping(
        address _address,
        string memory _nationalId
    ) external {
        require(
            nationalIdToLockerFactoryAddress[_nationalId] == address(0x0),
            "An account for this ID exists"
        );
        nationalIdToLockerFactoryAddress[_nationalId] = _address;
    }

    function attestDeath(string memory _nationalId) public {
        address lockerFactoryAddress = nationalIdToLockerFactoryAddress[
            _nationalId
        ];
        uint256 currentCount = lockerFactoryToVerifiedCount[
            lockerFactoryAddress
        ];
        uint256 newCount = currentCount + 1;
        lockerFactoryToVerifiedCount[lockerFactoryAddress] = newCount;

        if (lockerFactoryToVerifiedCount[lockerFactoryAddress] >= 2) {
            setUserDeath(_nationalId);
        }
    }

    // ------------------------ Provable Oracle Functions ------------------------
    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != provable_cbAddress()) revert();
        emit LogReceivedData(myid, result);
    }

    function setUserDeath(string memory _nationalId) public payable {
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query was sent, standing by for the answer.."
            );
            string memory path = string.concat(
                "json(https://crypto-inheritor-backend.herokuapp.com/api/users/trigger/",
                _nationalId
            );
            path = string.concat(path, ").isAlive");
            provable_query("URL", path);
        }
    }

    receive() external payable {}
}
