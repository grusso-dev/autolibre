module.exports = function(sequelize, DataTypes) {
    let alias = "User";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        nombre: {
            type: DataTypes.STRING
        },
        contrasenia: {
            type: DataTypes.STRING
        },
        fechaNacimiento: {
            type: DataTypes.DATE
        },
        numeroDocumento: {
            type: DataTypes.INTEGER
        },
        foto: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.STRING
        },
        updatedAt: {
            type: DataTypes.STRING
        },
        deletedAt: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: false
    };

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "clienteId"
        });

        User.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "clienteId"
        });
    };

    return User;
};
