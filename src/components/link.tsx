import React from "react";
import styled from "styled-components";

interface LinkProps {
  url: string;
  children: string | string[];
}

const StyledLink = styled.a`
  color: #FFF;
`;

const Link = (props: LinkProps): JSX.Element => {
  const { url, children } = props;

  return (<StyledLink href={url} target={'_blank'} rel={'noopener noreferrer'}>{children}</StyledLink>);
}

export default Link;