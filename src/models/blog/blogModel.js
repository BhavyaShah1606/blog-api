import { Model, DataTypes } from 'sequelize';
import commonOptions from '../commonOptions.js';
import sequelize from '../dbConnection.js';

class BlogModel extends Model { }

BlogModel.init(
    {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'Title',
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          shortDescription: {
            type: DataTypes.STRING(255),
            field: 'ShortDescription',
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          category: {
            type: DataTypes.STRING(50),
            allowNull: false,
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          filePath: {
            type: DataTypes.STRING(100),
            field: 'FilePath',
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          postType: {
            type: DataTypes.STRING(50),
            field: 'PostType',
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          content: {
            type: DataTypes.TEXT,
            collate: 'SQL_Latin1_General_CP1_CI_AS'
          },
          statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          readingTime: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          publishedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'PublishedAt'
          },
          createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'CreatedBy'
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('getutcdate()'),
            field: 'CreatedAt'
          },
          lastUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('getutcdate()'),
            field: 'LastUpdated'
          }
    },
    {
        ...commonOptions,
        modelName: 'BlogModel',
        tableName: 'Blog',
        schema: 'Blog',
    }
);

export default BlogModel;
