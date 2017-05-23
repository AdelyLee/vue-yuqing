/**
 * Created by lyc on 17-5-23.
 *
 * BriefingCell 实体类
 */
const BriefingCell = {
    constructor(level, title, imageUrl, option, description, children) { //构造函数
        this.level = level;
        this.title = title;
        this.imageUrl = imageUrl;
        this.option = option; // chart option
        this.description = description;
        this.children = children;
    },

    getLevel() {
        return this.level;
    },

    setLevel(level) {
        this.level = level;
    },

    getTitle() {
        return this.title;
    },

    setTitle(title) {
        this.title = title;
    },

    getImageUrl() {
        return this.imageUrl;
    },

    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    },

    getOption() {
        return this.option;
    },

    setOption(option) {
        this.option = option;
    },

    getDescription() {
        return this.description;
    },

    setDescription(description) {
        this.description = description;
    },

    getChildren() {
        return this.children;
    },

    setChildren(children) {
        this.children = children;
    }
};

module.exports = BriefingCell;

// export {BriefingCell}
