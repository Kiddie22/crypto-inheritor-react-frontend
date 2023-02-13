// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract Locker {
    string public name;
    address public owner;
    address public beneficiary;

    constructor(
        string memory _name,
        address _owner,
        address _beneficiary
    ) {
        name = _name;
        owner = _owner;
        beneficiary = _beneficiary;
    }

    // Modifier to check that the caller is the owner of the contract
    modifier isOwner() {
        require(msg.sender == owner, "Not Allowed!");
        _;
    }

    event WithdrewERC20(address token, address by, uint256 amount);
    event Withdrew(address by, uint256 amount);
    event Received(uint256 amount);

    // ------------------------ Owner Functions ------------------------
    function withdrawERC20(address _tokenAddress, uint256 _amount)
        external
        isOwner
    {
        IERC20Metadata token = IERC20Metadata(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= _amount, "Not Enought Balance !");
        token.transfer(msg.sender, _amount);
        emit WithdrewERC20(_tokenAddress, msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external isOwner {
        require(address(this).balance >= _amount, "Not Enought Balance !");
        payable(msg.sender).transfer(_amount);
        emit Withdrew(msg.sender, _amount);
    }

    // ------------------------ Beneficiary Automated Function ------------------------
    function transferFundsToBeneficiary() external {
        payable(beneficiary).transfer(address(this).balance);
    }

    receive() external payable {
        // check if sender is owner of the contract
        require(msg.sender == owner, "Not Owner");
        emit Received(msg.value);
    }
}
