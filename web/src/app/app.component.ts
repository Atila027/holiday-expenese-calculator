import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * @class AppComponent
 * @author Tomas Atila <atila423027@gmail.com>
 */
export class AppComponent {
  dynamicForm: FormGroup;
  pendingAmount = 0;
  responsePending = false;
  errorMessage = '';
  calculated = false;
  summary: Object;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  /**
   * On initialize create form and add an initial item
   */
  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Getter methods for convenience
   */
  get f() { return this.dynamicForm.controls; }
  get e() { return this.f.expenses as FormArray; }

  /**
   * Adds another expense item to form
   */
  addExpense() {
    this.e.push(this.formBuilder.group({
      name: ['', Validators.required],
      amount:[0, Validators.required]
    }));
  }

  /**
   * Shows the Expenses Form section
   */
  goBack() {
    this.calculated = false;
  }

  /**
   * Initializes dynamic form and adds one set of expense inputs
   */
  initializeForm() {
    this.dynamicForm = this.formBuilder.group({
      expenses: new FormArray([])
    });
    this.e.push(this.formBuilder.group({
      name: ['', Validators.required],
      amount:[0, Validators.required]
    }));
  }

  /**
   * Removes expense item by index
   * @param index
   */
  removeExpense(index) {
    const amount = this.e.value[index].amount;
    this.pendingAmount -= parseFloat(amount);
    this.e.removeAt(index);
  }

  /**
   * Re-initializes form, and goes back to form section
   */
  reset() {
    this.initializeForm();
    this.goBack();
  }

  /**
   * Sums expenses, recalculates the pending amount
   * @param event
   * @param index
   */
  onChangeAmount(event, index) {
    let element = this.e.at(index);

    if (event.target.value) {
      // Split on separators (, ; [space]):
      const amounts = event.target.value.split(/,| |;/);

      // Sum amounts:
      const reducer = (accumulator, currentValue) => {
        const value = parseFloat(currentValue);
        return !isNaN(value) ? accumulator + value : accumulator;
      };
      const sum = this.parseAmount(amounts.reduce(reducer, 0));
      element.patchValue({ name: element.value.name, amount: sum });

      // Sum all expense inputs:
      this.sumAllExpenses();
    }
  }

  /**
   * Parses floating-point to money (.XX)
   * @param {number} amount
   */
  private parseAmount(amount) {
    return parseFloat(amount.toFixed(2));
  }

  /**
   * Sums all expense input values
   */
  private sumAllExpenses() {
    // Re-sum pending amount:
    this.pendingAmount = 0;

    for (let i = 0; i < this.e.length; i++) {
      this.pendingAmount += parseFloat(this.e.at(i).value.amount);
    }
  }

  /**
   * Submits form via the API service, passing the form array
   */
  async onSubmit() {
    if (this.e.length > 1 && this.dynamicForm.valid) {
      try {
        this.errorMessage = '';
        this.summary = await this.api.postPayouts(this.e);
        this.calculated = true;
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.responsePending = false;
      }
    }
  }
}
