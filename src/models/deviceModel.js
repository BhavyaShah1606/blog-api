import { Model, DataTypes } from 'sequelize';
import commonOptions from './commonOptions.js';

class DeviceModel extends Model { }

DeviceModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        deviceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        appName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        appBuildId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        osName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        osVersion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        osBuildId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalMemory: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        totalDiskStorage: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        ...commonOptions,
        modelName: 'DeviceModel',
        tableName: 'Device',
        schema: 'Auth',
    }
);

export default DeviceModel;
