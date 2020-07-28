import React from 'react';
import './App.scss';
import { Products, ProductsList, Summary, SummaryDiscounts, SummaryItems, SummaryTotal } from './components';
import { Checkout } from './models';
import { dataService } from './services/data-service';
import { CartItem, DiscountItem, ItemCode, PricingSettings, PricingRules } from './types';

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

  async componentDidMount(): Promise<void> {
    const pricingRules = await dataService<PricingRules>(this.props.settings);
    this.checkout = new Checkout(pricingRules);
    this.setState({ isLoading: false });
    this.updateState();
  }

  render(): JSX.Element {
    return (
      <main className="App">
        <Products isLoading={this.state.isLoading}>
          <ProductsList items={this.state.cartItems} scan={this.scan} remove={this.remove} />
        </Products>
        <Summary>
          <SummaryItems quantity={this.state.orderedItemsQuantity} subTotal={this.state.subTotal} />
          <SummaryDiscounts items={this.state.discountItems} />
          <SummaryTotal isLoading={this.state.isLoading} total={this.state.total} />
        </Summary>
      </main>
    );
  };

  scan = (itemCode: ItemCode, quantity?: number): void => {
    this.checkout.scan(itemCode, quantity);
    this.updateState();
  }

  remove = (itemCode: ItemCode): void => {
    this.checkout.remove(itemCode);
    this.updateState();
  }

  private updateState(): void {
    const { cartItems, discountItems, subTotal, orderedItemsQuantity } = this.checkout;

    this.setState({
      cartItems,
      orderedItemsQuantity,
      discountItems,
      subTotal,
      total: this.checkout.total(),
    });
  }
};
