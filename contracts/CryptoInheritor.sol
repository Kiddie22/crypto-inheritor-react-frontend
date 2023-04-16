// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./LockerFactory.sol";

contract CryptoInheritor {
    uint256 public lockerFactoryCount;
    mapping(address => LockerFactory) private userToFactoryAddress;
    event NewLockerFactory(LockerFactory lockerFactory, address owner);

    function newLockerFactory(
        string memory username,
        string memory nationalId
    ) public payable {
        require(
            address(userToFactoryAddress[msg.sender]) == address(0x0),
            "You have already created a LockerFactory contract"
        );
        LockerFactory lockerFactory = new LockerFactory(
            msg.sender,
            username,
            nationalId
        );
        lockerFactoryCount++;
        userToFactoryAddress[msg.sender] = lockerFactory;
        emit NewLockerFactory(lockerFactory, msg.sender);
    }

    function getFactoryContractAddress() public view returns (LockerFactory) {
        return userToFactoryAddress[msg.sender];
    }
}
