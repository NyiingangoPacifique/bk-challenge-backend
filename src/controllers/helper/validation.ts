export const validateUserInput = (data: any) => {
    const { name, email,phone } = data;
    const errors: string[] = [];
  
    if (!name || typeof name !== 'string') {
      errors.push('Name is required and must be a string.');
    }
  
    const emailPat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!email || typeof email !== 'string' || !emailPat.test(email)) {
      errors.push('Email is required and must be a valid email address.');
    }
    const pattern = /^(07[28-9]|73|073)\d{7}$/;
    if(!pattern.test(phone)) {
        errors.push('incorret phone number format it must be');
    }
    if (!phone) {
        errors.push('phone is required.');
      }
    
  
    return errors.length === 0 ? null : errors;
  };

  export const validateProductInput = (data: any) => {
    const { name, cost,description,image,stockQty,category,kgAcre } = data;
    const errors: string[] = [];
  
    if (!name || typeof name !== 'string') {
      errors.push('Name is required and must be a string.');
    }
  
    const decimalPat = /^\d+(\.\d+)?$/;
    if (!cost) {
        errors.push('cost is required.');
      }
    if (!decimalPat.test(cost)){
        errors.push('cost must be number or decimal')
    }
    if (!description || typeof description !== 'string') {
        errors.push('description is required and must be a string.');
    }
    if (!image || typeof image !== 'string') {
        errors.push('image is required and must be a string.');
    }
    if (!stockQty || !decimalPat.test(stockQty)) {
        errors.push('stock is required and must be a number.');
    }
    if (!kgAcre || !decimalPat.test(kgAcre)) {
        errors.push('Kg/Acre is required and must be a number.');
    }
    
    const allowedValues = ['fertilizers', 'seed'];
    if(!category || typeof category !== "string" || !allowedValues.includes(category)){
        errors.push('category is required and must be a seed or fertilizer.');
    }
    if(category==allowedValues[0]){
        if (kgAcre > 3) {
            errors.push('fertilizer quantity should not exceed 3kgs per 1 acre of land');
        }
    }
    if(category==allowedValues[1]){
        if (kgAcre > 1) {
            errors.push('seed quantity should not exceed 1kgs per 1 acre of land');
        }
    }


    return errors.length === 0 ? null : errors;
  };  
  