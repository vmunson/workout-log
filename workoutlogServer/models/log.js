module.exports = function(sequlize, DataTypes){
    return sequlize.define('log', {
        description: DataTypes.STRING,
        date: DataTypes.STRING,
        distance: DataTypes.INTEGER,
        time: DataTypes.INTEGER,
        owner: DataTypes.INTEGER,
        def: DataTypes.STRING,
        heart: DataTypes.INTEGER
    },
    {

    })
}