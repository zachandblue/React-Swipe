import React, { Component } from 'react';
import { Gesture } from 'react-with-gesture';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';
import { Spring, animated, interpolate, config } from 'react-spring';
import { Card } from 'Elements';
import { images, elevation } from 'Utilities';

const AnimCard = Card.withComponent(animated.div);

const DragCard = AnimCard.extend`
  height: 300px;
  width: 320px;
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 5px;
  ${elevation[4]};
  @media (max-width: 460px) {
    width: 85vw;
  }
`;

const CardContainer = styled(animated.div)`
  position: relative;
  border-radius: 5px;
  padding: 15px;
  ${elevation[4]};
  max-width: 320px;
  margin: 0 auto;
  background: white;
  border-radius: 5px;
  height: 300px;
  margin-bottom: 50px;

  @media (max-width: 460px) {
    width: 85vw;
  }
`;

class Drag extends Component {
  constructor() {
    super();

    this.state = {
      i: 0,
      hidden: ''
    };
  }
  onUp = xDelta => () => {
    let i = this.state.i;

    if (xDelta < -100 || xDelta > 100) {
      if (i === images.length - 1) {
        this.setState({
          i: 0
        });
        return;
      }
      this.setState({
        hidden: 'none'
      });
      setTimeout(() => {
        this.setState({ i: i + 1, hidden: '' });
      }, 300);
    }
  };

  render() {
    return (
      <Gesture>
        {({ down, x, y, xDelta, yDelta, xInitial, yInitial }) => (
          <Spring
            native
            to={{
              x: down ? xDelta : 0
            }}
            immediate={name => down && name === 'x'}
            config={config.stiff}
          >
            {({ x }) => (
              <CardContainer style={{}}>
                <Image
                  cloudName="dvodrdrmz"
                  publicId={images[this.state.i + 1] || images[0]}
                  width="300"
                  crop="scale"
                  style={{
                    userDrag: 'none',
                    userSelect: 'none',
                    MozUserSelect: 'none',
                    WebkitUserDrag: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                />
                <DragCard
                  onMouseUp={this.onUp(xDelta)}
                  onTouchEnd={this.onUp(xDelta)}
                  style={{
                    display: `${this.state.hidden}`,
                    transform: interpolate(
                      [
                        x,
                        x.interpolate({
                          range: [-300, 300],
                          output: [-45, 45],
                          extrapolate: 'clamp'
                        })
                      ],
                      (x, rotate) => `translateX(${x}px) rotate(${rotate}deg) `
                    ),
                    opacity: interpolate(
                      [
                        x,
                        x.interpolate({
                          range: [-300, -100, 100, 300],
                          output: [0, 1, 1, 0],
                          extrapolate: 'clamp'
                        })
                      ],
                      (x, opacity) => `
                        ${opacity}
                      `
                    )
                  }}
                >
                  <Image
                    cloudName="dvodrdrmz"
                    publicId={images[this.state.i]}
                    width="300"
                    crop="scale"
                    style={{
                      userDrag: 'none',
                      userSelect: 'none',
                      MozUserSelect: 'none',
                      WebkitUserDrag: 'none',
                      WebkitUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  />
                </DragCard>
              </CardContainer>
            )}
          </Spring>
        )}
      </Gesture>
    );
  }
}

export default Drag;
