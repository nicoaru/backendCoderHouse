var ColorGenerator = /** @class */ (function () {
    function ColorGenerator() {
    }
    ColorGenerator.generarColor = function () {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        return "rgb(".concat(red, ",").concat(green, ",").concat(blue, ")");
    };
    return ColorGenerator;
}());
console.log(ColorGenerator.generarColor());
