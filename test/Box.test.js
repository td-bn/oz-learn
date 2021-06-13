const {expect} = require('chai');
const { accounts, contract } = require('@openzeppelin/test-environment');
const {BN, expectRevert, expectEvent} = require('@openzeppelin/test-helpers');

const Box = contract.fromArtifact('Box');

describe('Box', function() {

    const [owner, other] = accounts;
    const value = new BN('42');
    
    beforeEach(async function() {
        this.box = await Box.new({from: owner});
    });

    it('retreives a value previuosly stored', async function() {
        await this.box.store(value, {from: owner});
        expect(await this.box.retreive()).to.be.bignumber.equal(value);
    });

    it('emits an event when value is stored', async function() {
        const receipt = await this.box.store(value, {from: owner});
        expect(receipt, 'ValueChanged', {newValue: value});
    });

    it('does not allow non-owner to store value', async function() {
        await expectRevert(
            this.box.store(value, {from: other}),
            'Ownable: caller is not the owner.'
        );
    });
});
