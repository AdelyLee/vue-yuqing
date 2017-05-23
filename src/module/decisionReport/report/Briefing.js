/**
 * Created by lyc on 17-5-23.
 *
 * Briefing 实体类
 */
class Briefing {
    constructor(title, subTitle, author, createTime, outline, issue, briefingBody, summary) { //构造函数
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.createTime = createTime;
        this.issue = issue;
        this.outline = outline;
        this.briefingBody = briefingBody;
        this.summary = summary;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get subTitle() {
        return this._subTitle;
    }

    set subTitle(subTitle) {
        this._subTitle = subTitle;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        this._author = author;
    }

    get issue() {
        return this._issue;
    }

    set issue(issue) {
        this._issue = issue;
    }

    get createTime() {
        return this._createTime;
    }

    set createTime(createTime) {
        this._createTime = createTime;
    }

    get outline() {
        return this._outline;
    }

    set outline(outline) {
        this._outline = outline;
    }

    get briefingBody() {
        return this._briefingBody;
    }

    set briefingBody(briefingBody) {
        this._briefingBody = briefingBody;
    }

    get summary() {
        return this._summary;
    }

    set summary(summary) {
        this._summary = summary;
    }
}

module.exports = Briefing;
