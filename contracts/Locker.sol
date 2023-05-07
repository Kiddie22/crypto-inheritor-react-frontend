// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Locker {
    using SafeERC20 for IERC20;

    string public name;
    address private owner;
    address private beneficiary;
    address private lockerFactoryAddress;

    constructor(
        string memory _name,
        address _owner,
        address _beneficiary,
        address _lockerFactoryAddress
    ) {
        name = _name;
        owner = _owner;
        beneficiary = _beneficiary;
        lockerFactoryAddress = _lockerFactoryAddress;
    }

    // Modifier to check that the caller is the owner of the contract
    modifier isOwner() {
        require(msg.sender == owner, "You're not the owner!");
        _;
    }

    modifier isLockerFactory() {
        require(msg.sender == lockerFactoryAddress, "Invalid call");
        _;
    }

    event WithdrewERC20(address token, address by, uint256 amount);
    event Withdrew(address by, uint256 amount);
    event Received(uint256 amount);

    // ------------------------ Owner Functions ------------------------
    function withdrawERC20(address _tokenAddress, uint256 _amount) external isOwner {
        IERC20 erc20Token = IERC20(_tokenAddress);
        uint256 balance = erc20Token.balanceOf(address(this));
        require(balance >= _amount, "Not Enought Balance !");
        erc20Token.safeTransfer(msg.sender, _amount);
        emit WithdrewERC20(_tokenAddress, msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external isOwner {
        require(address(this).balance >= _amount, "Not Enought Balance !");
        payable(msg.sender).transfer(_amount);
        emit Withdrew(msg.sender, _amount);
    }

    function getOwnerAddress() public view isOwner returns (address) {
        return owner;
    }

    function getBeneficiaryAddress() public view isOwner returns (address) {
        return beneficiary;
    }

    // ------------------------ Beneficiary Automated Function ------------------------
    function transferFundsToBeneficiary() external isLockerFactory {
        payable(beneficiary).transfer(address(this).balance);
    }

    receive() external payable {
        // check if sender is owner of the contract
        require(msg.sender == owner, "Not Owner");
        emit Received(msg.value);
    }
}
