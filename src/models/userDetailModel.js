import { Model, DataTypes, Sequelize } from 'sequelize';
import commonOptions from './commonOptions.js';
import DeviceModel from './deviceModel.js';

class UserDetailModel extends Model { }

UserDetailModel.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        postCode: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(10),
            defaultValue: 'Pending',
            allowNull: false,
        },
        registrationDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('GETDATE'),
            allowNull: false,
        },
        deviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: DeviceModel,
                key: 'Id',
            },
            allowNull: true,
        },
        deviceToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastLoginOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lastUpdatedOn: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        ...commonOptions,
        modelName: 'UserDetail',
        tableName: 'userdetail',
        schema: 'Auth',
    }
);

export default UserDetailModel;
