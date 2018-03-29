/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern();
        this.Simulation = new Simulation()
    }

    RegisterOnReady() {
        this.Pattern.RegisterOnReady();
        this.Simulation.RegisterOnReady();

        $($.proxy(this.onReady, this))
    }

    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size);
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY);
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);

        this.displayAntInfo();

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this));
        $("input[type=radio]").on("click", $.proxy(this.resetGrid, this));
        $("#Reset").on("click", $.proxy(this.resetGrid, this));
        $("#MoveForward").on("click", $.proxy(this.antAdvance, this));

        console.log("Langton.onReady")
    }

    displayAntInfo() {
        $(".ant-x").html(this.Ant.X);
        $(".ant-y").html(this.Ant.Y);
        $(".ant-direction").html(this.Ant.Direction);
        $(".ant-nb-steps").html(this.Ant.NbSteps);
    }

    resetGrid() {
        this.Grid.Size = this.Simulation.Size;
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY);
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);
        langton.displayAntInfo()
    }

    antAdvance() {
        let color = this.Grid.GetColor(this.Ant.X, this.Ant.Y);
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, color === "#FFFFFF" ? "#000000" : "#FFFFFF");
        this.Ant.Turn(color === "#FFFFFF" ? "right" : "left");
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);
    }
}

let langton = new Langton();
langton.RegisterOnReady();
