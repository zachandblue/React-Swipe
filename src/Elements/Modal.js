import React, { Component } from 'react';
import { Transition, animated, config } from 'react-spring';
import styled from 'styled-components';

import { Portal, absolute } from 'Utilities';
import { Card } from './Cards';
import { Icon } from 'Elements';

class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        <Transition
          native
          config={config.wobbly}
          from={{ opacity: 0, bgOpacity: 0, y: -50 }}
          enter={{ opacity: 1, bgOpacity: 0.5, y: 0 }}
          leave={{ opacity: 0, bgOpacity: 0, y: 50 }}
        >
          {on &&
            (styles => (
              <ModalWrapper>
                <ModalCard
                  style={{
                    transform: styles.y.interpolate(
                      y => `translate3d(0, ${y}px, 0)`
                    ),

                    ...styles
                  }}
                >
                  <CloseButton onClick={toggle}>
                    <Icon name="close" color="black" />
                  </CloseButton>
                  <div>{children}</div>
                </ModalCard>
                <Background
                  style={{ opacity: styles.bgOpacity }}
                  onClick={toggle}
                />
              </ModalWrapper>
            ))}
        </Transition>
      </Portal>
    );
  }
}

export default Modal;

const ModalWrapper = styled.div`
  ${absolute({})};
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimCard = Card.withComponent(animated.div);

const ModalCard = AnimCard.extend`
  position: relative;

  z-index: 10;
  margin-bottom: 100px;
  text-align: center;
  @media (max-width: 460px) {
    width: 90vw;
  }
`;

const CloseButton = styled.button`
  ${absolute({
    y: 'top',
    x: 'right'
  })};
  border: none;
  background: transparent;
  padding: 5px;
`;

const Background = styled(animated.div)`
  ${absolute({})};
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;
