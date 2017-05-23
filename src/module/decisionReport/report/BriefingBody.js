/**
 * Created by lyc on 17-5-23.
 *
 * report 实体类
 */

class BriefingBody {
    constructor(briefingCells) { //构造函数
        this.briefingCells = briefingCells;
    }

    get briefingCells() {
        return this._briefingCells;
    }

    set briefingCells(briefingCells) {
        this._briefingCells = briefingCells;
    }
}

module.exports = BriefingBody;
// export {BriefingBody}
