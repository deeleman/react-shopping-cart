import React from 'react';
import { Checkout } from '../models';
import { dataService } from '../services/data-service';
import { CartItem, DiscountItem, PricingSettings } from './../types';
import './App.scss';
import { Products, ProductsList } from './products';
import { Summary, SummaryDiscounts, SummaryItems, SummaryTotal } from './summary';

interface AppProps {
  settings: PricingSettings,
}

interface AppState {
  cartItems: CartItem[];
  discountItems: DiscountItem[];
  orderedItemsQuantity: number;
  subTotal: number;
  total: number;
  isLoading: boolean;
};

export class App extends React.Component<AppProps, AppState> {
  readonly state: AppState;

  private checkout!: Checkout;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      cartItems: [],
      discountItems: [],
      orderedItemsQuantity: 0,
      subTotal: 0,
      total: 0,
      isLoading: true,
    };
  }

  componentDidMount(): void {
    dataService(this.props.settings).then((pricingRules) => {
      this.checkout = new Checkout(pricingRules);
      this.updateState();
    });
  }

  render() {
    return (
      <main className="App">
        <Products>
          <ProductsList />
        </Products>
        <Summary>
          <SummaryItems />
          <SummaryDiscounts />
          <SummaryTotal />
        </Summary>
      </main>
    );
  };

  private updateState(): void {
    const { cartItems, discountItems, subTotal, orderedItemsQuantity } = this.checkout;

    this.setState((state) => ({
      ...state,
      cartItems,
      orderedItemsQuantity,
      discountItems,
      subTotal,
      total: this.checkout.total(),
    }));
  }
};
