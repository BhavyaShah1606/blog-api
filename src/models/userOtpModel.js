import { Model, DataTypes } from 'sequelize';
import commonOptions from './commonOptions.js';
import UserDetailModel from './userDetailModel.js'; // Import the UserDetailModel to set up the foreign key relationship

class UserOTPModel extends Model { }

UserOTPModel.init(
    {
        otpId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserDetailModel,
                key: 'userId',
            },
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
        },
        otp: {
            type: DataTypes.CHAR(4),
            allowNull: false,
        },
        expiryDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        ...commonOptions,
        modelName: 'UserOTP',
        tableName: 'userotp',
        schema: 'Auth',
    }
);

export default UserOTPModel;
