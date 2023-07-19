import * as colors from "https://deno.land/std/fmt/colors.ts"
// console.log(Deno.args)
let numbers = Deno.args.map(arg => Number(arg)).sort((a,b) => a-b)
// console.log(numbers)

const text = `Números: ${Deno.args.toString()}\nMínimo: ${numbers[0]}\nMáximo: ${numbers[numbers.length-1]}\nPromedio: ${numbers.reduce((acc, curr) => acc + curr) / numbers.length}`

console.log(
    `${colors.bold('Números:')} ${Deno.args.toString()}`, 
    colors.yellow(`${colors.bold('\nMínimo:')} ${numbers[0]}`), 
    colors.red(`${colors.bold('\nMáximo:')} ${numbers[numbers.length-1]}`), 
    colors.green(`${colors.bold('\nPromedio:')} ${numbers.reduce((acc, curr) => acc + curr) / numbers.length}`)
    )

await Deno.writeTextFile("resultados.dat", text)