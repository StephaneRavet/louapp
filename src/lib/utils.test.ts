import { shuffle } from './utils';

describe('fonction shuffle', () => {
  test('deux appels consécutifs doivent produire des résultats différents', () => {
    // Créer un tableau de test avec assez d'éléments pour rendre le test fiable
    const array = Array.from({ length: 100 }, (_, i) => i);
    
    // Effectuer deux appels à shuffle
    const result1 = shuffle(array);
    const result2 = shuffle(array);
    
    // Vérifier que les résultats sont différents
    expect(result1).not.toEqual(result2);
    
    // Vérifier que les deux résultats contiennent les mêmes éléments que l'original
    expect([...result1].sort((a, b) => a - b)).toEqual(array);
    expect([...result2].sort((a, b) => a - b)).toEqual(array);
    
    // Vérifier que la fonction ne modifie pas le tableau d'origine
    const original = [...array];
    shuffle(array);
    expect(array).toEqual(original);
  });
}); 