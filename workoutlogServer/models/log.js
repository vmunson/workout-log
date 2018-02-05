module.exports = function(sequlize, DataTypes){
    return sequlize.define('log', {
        description: DataTypes.STRING,
        result: DataTypes.STRING,
        owner: DataTypes.INTEGER,
        def: DataTypes.STRING,
        heart: DataTypes.STRING
    },
    {

    })
}