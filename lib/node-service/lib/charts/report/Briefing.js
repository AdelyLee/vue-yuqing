/**
 * Created by lyc on 17-5-23.
 *
 * Briefing 实体类
 */
const Briefing = {
    constructor(title, subTitle, author, createTime, outline, issue, briefingBody, summary) { //构造函数
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.createTime = createTime;
        this.issue = issue;
        this.outline = outline;
        this.briefingBody = briefingBody;
        this.summary = summary;
    },

    getTitle() {
        return this.title;
    },

    setTitle(title) {
        this.title = title;
    },

    getSubTitle() {
        return this.subTitle;
    },

    setSubTitle(subTitle) {
        this.subTitle = subTitle;
    },

    getAuthor() {
        return this.author;
    },

    setAuthor(author) {
        this.author = author;
    },

    getIssue() {
        return this.issue;
    },

    setIssue(issue) {
        this.issue = issue;
    },

    getCreateTime() {
        return this.createTime;
    },

    setCreateTime(createTime) {
        this.createTime = createTime;
    },

    getOutline() {
        return this.outline;
    },

    setOutline(outline) {
        this.outline = outline;
    },

    getBriefingBody() {
        return this.briefingBody;
    },

    setBriefingBody(briefingBody) {
        this.briefingBody = briefingBody;
    },

    getSummary() {
        return this.summary;
    },

    setSummary(summary) {
        this.summary = summary;
    }
};

module.exports = Briefing;
