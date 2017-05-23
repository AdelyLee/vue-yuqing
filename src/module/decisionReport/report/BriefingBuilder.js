/**
 * Created by lyc on 17-5-23.
 *
 * BriefingBuilder 构建类
 */

var Briefing = require('./Briefing.js');
var BriefingCell = require('./BriefingCell.js');
var BriefingBody = require('./BriefingBody.js');

var BriefingBuilder = function () {
    var briefing = new Briefing();

    this.buildTitle = function (title) {
        briefing.title = title;
    };

    this.buildSubTitle = function (subTitle) {
        briefing.subTitle = subTitle;
    };

    this.buildAuthor = function (author) {
        briefing.author = author;
    };

    this.buildCreateTime = function (createTime) {
        briefing.createTime = createTime;
    };

    this.buildOutline = function (outline) {
        briefing.outline = outline;
    };

    this.buildIssue = function (issue) {
        briefing.issue = issue;
    };

    this.buildBriefingBody = function (briefingBody) {
        briefing.briefingBody = briefingBody;
    };

    this.buildSummary = function (summary) {
        briefing.summary = summary;
    };

    this.getBriefing = function () {
        return briefing;
    };
};

var BriefingDirector = function () {
    var briefingBuilder = new BriefingBuilder();
    this.createBriefing = function(briefing){
        // 先构造简报Title
        briefingBuilder.buildTitle(briefing.title);
        briefingBuilder.buildSubTitle(briefing.subTitle);
        briefingBuilder.buildAuthor(briefing.author);
        briefingBuilder.buildCreateTime(briefing.createTime);
        briefingBuilder.buildOutline(briefing.outline);
        briefingBuilder.buildIssue(briefing.issue);
        briefingBuilder.buildBriefingBody(briefing.briefingBody);
        briefingBuilder.buildSummary(briefing.summary);
    }
};

var BriefingCellBuilder = function () {
    var briefingCell = new BriefingCell();

    this.buildTitle = function (title) {
        briefingCell.title = title;
    };

    this.buildImageUrl = function (imageUrl) {
        briefingCell.imageUrl = imageUrl;
    };

    this.buildDescription = function (description) {
        briefingCell.description = description;
    };

    this.buildChildren = function (children) {
        briefingCell.children = children;
    };

    this.getBriefingCell = function () {
        return briefingCell;
    };
};

var BriefingCellDirector = function () {
    var briefingCellBuilder = new BriefingCellBuilder();
    this.createBriefingCell = function(briefingCell){
        // 先构造简报Title
        briefingCellBuilder.buildTitle(briefingCell.title);
        briefingCellBuilder.buildImageUrl(briefingCell.imageUrl);
        briefingCellBuilder.buildDescription(briefingCell.description);
        briefingCellBuilder.buildChildren(briefingCell.children);
    }
};

var BriefingBodyBuilder = function () {
    var briefingBody = new BriefingBody();

    this.buildBriefingCells = function (briefingCells) {
        briefingBody.briefingCells = briefingCells;
    };

    this.getBriefingBody = function () {
        return briefingBody;
    };
};

var BriefingBodyDirector = function () {
    var briefingBodyBuilder = new BriefingBodyBuilder();
    this.createBriefingBody = function(briefingCells){
        // 先构造简报Title
        briefingBodyBuilder.buildBriefingCells(briefingCells);
    }
};

module.exports = {BriefingBuilder, BriefingDirector, BriefingCellBuilder, BriefingCellDirector, BriefingBodyBuilder, BriefingBodyDirector};
// export {BriefingBuilder, BriefingDirector, BriefingCellBuilder, BriefingCellDirector, BriefingBodyBuilder, BriefingBodyDirector}
