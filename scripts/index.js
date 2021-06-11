module.exports = async function(callback) {
    try {
        const Box = artifacts.require("Box");
        const box = await Box.deployed();

        await box.store(23);

        const value = await box.retreive();
        console.log('Box has the value: ', value.toString());

        callback(0);
    } catch (error) {
       console.error(error);
       callback(1);
    }
}