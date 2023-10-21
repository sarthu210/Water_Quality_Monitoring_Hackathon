class PercentChart{
    #id;
    #data = {}
    #container;
    #chartSvg;
    #chartText;
    constructor(id, options){

        this.#id = id;

        this.delay = options.delay || '.2s';
        this.textDuration = options.textDuration || '.2s';
        this.chartDuration = options.chartDuration || '.2s';
        this.easing = options.easing || 'linear';
        options.data = options.data || {}
        let temp_percent = options.data.percent || 0;
        if(temp_percent<0 || temp_percent>100) throw "ParameterError: percent parameter not between 0-100!";
        this.#data.percent=temp_percent
        this.#data.actual = options.data.actual || 0;
        this.#data.unit = options.data.unit || "UNIT"
        this.enableHover = (options.enableHover != false);
        this.direction = options.direction || "cw"
        if(!(this.direction =="cw" || this.direction=="ccw")) throw "ParameterError: direction not either cw or ccw"
        let dir = (this.direction=="cw")? 1:0
        let template = `
        <svg viewBox="0 0 36 36" class="pc-chart">
            <path class="pc-bg" d="M18 2.0845a 15.9155 15.9155 0 0 ${dir} 0 31.831 a 15.9155 15.9155 0 0 ${dir} 0 -31.831"/>
            <path class="pc-fill" d="M18 2.0845  a 15.9155 15.9155 0 0 ${dir} 0 31.831 a 15.9155 15.9155 0 0 ${dir} 0 -31.831"/>
        </svg>
        <div class="pc-text">
            <div class="pc-num">
                <span id="pc-percent"></span>
                <span id="pc-actual"></span>
            </div>
            <span id="pc-unit"></span>
        </div>
        `

        this.#container = $(`#${this.id}`)
        this.#container.append(template)
        this.#container.addClass('pchart pc-container')
        this.#chartSvg = this.#container.children('.pc-chart')
        this.#chartText= this.#container.children('.pc-text')
        this.render()
    }
    get id(){
        return this.#id;
    }
    get percent(){
        return this.#data.percent;
    }
    get actual(){
        return this.#data.actual;
    }
    get unit(){
        return this.#data.unit;
    }

    render(){
        if(this.enableHover){
            this.#chartText.children(".pc-num").children("#pc-percent")
                .css({
                    transitionDuration:this.textDuration,
                    transitionDelay: this.delay,
                    transitionTimingFunction: this.easing
                })
                .html(`${this.#data.percent}%`)
            this.#chartText.children(".pc-num").children("#pc-actual")
                .css({
                    transitionDuration:this.textDuration,
                    transitionDelay: this.delay,
                    transitionTimingFunction: this.easing
                })
                .html(this.#data.actual)
        }
        else{
            this.#chartText.off('hover');
            this.#chartText.children(".pc-num").children("#pc-actual")
                .css({
                    transition:'none',
                    opacity:'100%'
                })
                .html(this.#data.actual)
        }
        this.#chartText.children("#pc-unit")
            .html(this.#data.unit)
        this.#chartSvg.children(".pc-fill")
            .css({
                transition: `stroke-dasharray ${this.chartDuration} ${this.easing}`
            })
        setTimeout(()=>
            this.#chartSvg.children(".pc-fill")
                .css("stroke-dasharray",`${this.#data.percent},100`)
        ,500);

    }
    setPercent(num){
        if(typeof(num)!='number') throw "ParameterError: not an integer."
        else if(num<0 || num > 100 ) throw "ParameterError: not in the range (0-100)"
        else{
            this.#data.percent = num;
            this.#chartSvg.children(".pc-fill")
                .css("stroke-dasharray",`${this.#data.percent},100`)
            this.#chartText.children(".pc-num").children("#pc-percent")
                .html(`${this.#data.percent}%`)
        }
    }
}   