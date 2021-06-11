// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Box is Ownable {
    uint private value;

    event ValueChanged(uint newValue);

    function store(uint newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retreive() public view returns(uint) {
        return value;
    }
}