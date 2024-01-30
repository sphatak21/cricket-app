export function separateNonNullFieldsCreate(playerData) {
    const nonNullFields = [];
    const nonNullValues = [];
  
    for (const key in playerData) {
      if (playerData[key] !== null) {
        nonNullFields.push(key);
        nonNullValues.push("'" + playerData[key]+ "'");
      }
    }
    const stringNonNullFields = nonNullFields.join(", ")
    const stringNonNullValues = nonNullValues.join(", ")
    return { stringNonNullFields , stringNonNullValues };
}
export function separateNonNullFieldsUpdate(playerData) {
    const result = [];
  
    for (const key in playerData) {
        if (playerData[key] !== null) {
        result.push(`${key} = '${playerData[key]}'`);
        }
    }

    return result.join(', ');
}

