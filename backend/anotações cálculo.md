## Passos de desenvolvimento cálculos

aplicar validação de setor selecionado antes de realizar os cálculos:

#### Setor selecionado -> móvel: se o usuário administrador cadastrar a regra de comissionamento com o setor móvel, validar o valor do critério 1 e o valor do critério 2
1º: critério 1 < 1.000 e critério 2 = 1.000 - o multiplicador dele deverá ser igual 0 - ok
 if (criterio1<1000 && criterio2===1000 && timeId === 5)

2º: critério 1 < 1.001 e critério 2 = 1.500 - o multiplicador dele deverá ser igual 30 (0,3) - ok
 if (criterio1<1001 && criterio2===1500 && timeId === 5)

3º: critério 1 < 1.501 e critério 2 = 1.999 - o multiplicador dele deverá ser igual 50 (0,5) - ok
 if (criterio1<1501 && criterio2===1999 && timeId === 5)

4º: critério 1 < 2.000 e critério 2 = 2.499 - o multiplicador dele deverá ser igual 60 (0,6) - ok
 if (criterio1<2000 && criterio2===1499 && timeId === 5)

5º: critério 1 < 2.500 e critério 2 = 2.999 - o multiplicador dele deverá ser igual 100 (1,0) - ok
 if (criterio1<2500 && criterio2===2.999 && timeId === 5)

6º: critério 1 < 3.000 e critério 2 = 3.999 - o multiplicador dele deverá ser igual 150 (1,5) - ok
 if (criterio1<3000 && criterio2===3.999 && timeId === 5)

7º: critério 1 > 4.000 - o multiplicador dele deverá ser igual 170 (1,7) - ok 
 if (criterio1>4000 && timeId === 5)

#### Setor selecionado -> soho ou vvn: se o usuário administrador cadastrar a regra de comissionamento com o setor móvel, validar o valor do critério 1 e o valor do critério 2
1º: critério 1 < 500 e critério 2 = 1.000 - o multiplicador dele deverá ser igual 20 (0,2) - ok
 if (criterio1<500 && criterio2===1000 && timeId === 9 || timeId === 10)

2º: critério 1 < 1.001 e critério 2 = 1.500 - o multiplicador dele deverá ser igual 35 (0,35) - ok
 if (criterio1<1001 && criterio2===1500 && timeId === 9 || timeId === 10)

3º: critério 1 < 1.501 e critério 2 = 2000 - o multiplicador dele deverá ser igual 50 (0,50) - ok
 if (criterio1<1501 && criterio2===2000 && timeId === 9 || timeId === 10)

4º: critério 1 < 2.001 e critério 2 = 2500 - o multiplicador dele deverá ser igual 80 (0,80) - ok
 if (criterio1<2001 && criterio2===2500 && timeId === 9 || timeId === 10)

5º: critério 1 < 2.501 e critério 2 = 3.000 - o multiplicador dele deverá ser igual 100 (0,1) - ok
 if (criterio1<2501 && criterio2===3000 && timeId === 9 || timeId === 10)

6º: critério 1 > 3.001 - o multiplicador dele deverá ser igual 110 (1,1) - ok
 if (criterio1>3001 && timeId === 9 || timeId === 10)

#### Setor selecionado -> carteira: se o usuário administrador cadastrar a regra de comissionamento com o setor móvel, validar o valor do critério 1 e o valor do critério 2
1º: critério 1 < 500 e critério 2 = 700 - o multiplicador dele deverá ser igual 10 (0,1) - ok
 if (criterio1<500 && criterio2===700 && timeId === ?)

2º: critério 1 < 701 e critério 2 = 900 - o multiplicador dele deverá ser igual 20 (0,2) - ok
 if (criterio1<701 && criterio2===900 && timeId === ?)

3º: critério 1 < 901 e critério 2 = 1200 - o multiplicador dele deverá ser igual 40 (0,4) - ok
 if (criterio1<901 && criterio2===1200 && timeId === ?)

4º: critério 1 < 1201 e critério 2 = 1500 - o multiplicador dele deverá ser igual 60 (0,6) - ok
 if (criterio1<1201 && criterio2===1500 && timeId === ?)

5º: critério 1 < 1501 e critério 2 = 2000 - o multiplicador dele deverá ser igual 70 (0,7) - ok
 if (criterio1<1501 && criterio2===2000 && timeId === ?)
 
6º: critério 1 > 2.001 - o multiplicador dele deverá ser igual 100 (0,8) - ok
 if (criterio1>2001 && timeId === ?)

o usuário vai cadastrar um valor qualquer, mas quando for realizar o cálculo deve se criar um if para que ele entre na área certa para realizar o cálculo