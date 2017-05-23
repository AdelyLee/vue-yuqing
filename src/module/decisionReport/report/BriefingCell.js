/**
 * Created by lyc on 17-5-23.
 *
 * BriefingCell 实体类
 */
class BriefingCell {
    constructor(title, imageUrl, description, children) { //构造函数
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.children = children;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get children() {
        return this._children;
    }

    set children(children) {
        this._children = children;
    }
}

module.exports = BriefingCell;

// export {BriefingCell}
