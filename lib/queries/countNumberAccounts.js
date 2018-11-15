/**
 * compteur pour les comptes
 */
export const selectNbAccountStructures = `SELECT COUNT(id)
FROM account_structures_teams
WHERE account_structures_teams.structure_code = structures.id 
AND account_structures_teams.type_of_code = 'Structure'`;

export const selectNbAccountTeams = `SELECT COUNT(id)
FROM account_structures_teams
WHERE account_structures_teams.structure_code = structures.id 
AND account_structures_teams.type_of_code = 'Equipe'`;

export const selectNbAccountIndividual = `SELECT COUNT(id) 
FROM individual_account_fede 
WHERE individual_account_fede.structure_code = structures.id`;
