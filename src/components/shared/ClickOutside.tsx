import { Component, ReactNode } from 'react'
import onClickOutside from 'react-onclickoutside'

interface ClickOutsideWrapperProps {
  handleClickOutside: () => void
  children: ReactNode
}

// Wrap component in this component to handle click outisde of that component
class ClickOutsideWrapper extends Component<ClickOutsideWrapperProps> {
  handleClickOutside = () => this.props.handleClickOutside()
  render = () => this.props.children
}

export default onClickOutside(ClickOutsideWrapper)
