export const validateCuil = (cuil: string | number): boolean => {
    const cuilLimpio = cuil.toString().replace(/[-_]/g, "");

    if (cuilLimpio.length !== 11 || !/^\d+$/.test(cuilLimpio)) {
        return false;
    }

    const digitos = cuilLimpio.split("").map(Number);
    const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    
    const suma = digitos
        .slice(0, 10)
        .reduce((acc, curr, index) => acc + curr * factores[index], 0);

    const resto = suma % 11;
    let dvEsperado: number;

    if (resto === 0) {
        dvEsperado = 0;
    } else if (resto === 1) {
        dvEsperado = digitos[10]; 
    } else {
        dvEsperado = 11 - resto;
    }

    return dvEsperado === digitos[10];
};