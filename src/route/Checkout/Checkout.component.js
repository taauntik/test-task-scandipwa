import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "@scandipwa/scandipwa/src/component/ContentWrapper";
import "./Checkout.extension.style.scss";

class Checkout extends SourceCheckout {
  state = {
    currentIndex: [1],
  };

  renderProgressBar = ({
    selected = false,
    end = false,
    name = "shipping",
    index = 1,
  }) => {
    return (
      <div className="progress">
        <div className={selected ? `line` : "notLine"}></div>
        {end ? null : (
          <div>
            <div className={selected ? `circle` : "notCircle"}>{index}</div>
            <div className="name">{name}</div>
          </div>
        )}
      </div>
    );
  };

  componentDidMount = () => {
    const stepMap = Object.keys(this.stepMap);
    const step = this.props.checkoutStep;
    if (stepMap.indexOf(step) + 1 > this.state.currentIndex.length) {
      this.setState((prevState) => {
        return {
          currentIndex: [...prevState.currentIndex, 1],
        };
      });
    }
  };

  componentDidUpdate(nextProps, nextState) {
    const stepMap = Object.keys(this.stepMap);
    console.log("NEXT PROPS", nextProps);
    console.log("NEXT State", nextState);
    const step = this.props.checkoutStep;
    if (nextProps.checkoutStep !== step) {
      if (stepMap.indexOf(step) + 1 > this.state.currentIndex.length) {
        this.setState((prevState) => {
          return {
            currentIndex: [...prevState.currentIndex, 1],
          };
        });
      }
    }
  }

  render() {
    const stepMap = Object.keys(this.stepMap);
    console.log("this", this.props);
    console.log("CURRENT INDEX", this.state.currentIndex);
    return (
      <main block="Checkout">
        <div className="ProgressBar">
          {/* {stepMap.map((item) => console.log(this.stepMap[item]))} */}
          {stepMap.map((item, index) => {
            console.log(stepMap[index]);
            return this.renderProgressBar({
              selected: this.state.currentIndex.length - 1 >= index,
              end: stepMap.length - 1 === index,
              name: stepMap[index],
              index: index + 1,
            });
          })}
          {/* {this.renderProgressBar({ selected: true })}
          {this.renderProgressBar({ selected: false })}
          {this.renderProgressBar({ selected: false, end: true })} */}
        </div>
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
