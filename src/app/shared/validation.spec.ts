import { Validation } from './validation';
import { FormControl, FormGroup } from '@angular/forms';

describe('Validation', () => {
  beforeEach(() => {
  });


  it('.passwordMatchValidator should validate matching passwords', () => {
    const passwordForm = createMockRegisterForm("123456", "123456");

    Validation.passwordMatchValidator(passwordForm);
    expect(passwordForm.valid).toBe(true);
  });

  it('.passwordMatchValidator should invalidate not matching passwords', () => {
    const passwordForm = createMockRegisterForm("123", "123456");

    Validation.passwordMatchValidator(passwordForm);
    expect(passwordForm.valid).toBe(false);
  });
});

function createMockRegisterForm(password: string, confirmPassword: string): FormGroup {
  return new FormGroup( {
    password: new FormControl(password),
    confirmPassword: new FormControl(confirmPassword)
  });
}