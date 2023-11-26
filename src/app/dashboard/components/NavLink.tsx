'use client';
import Link from 'next/link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  useMemo,
} from 'react';

function NavLink({ className, children, styles, borderRadius, ...props }: any) {
  const memoizedStyles = useMemo(
    () => ({
      borderRadius: borderRadius || 0,
      ...styles,
    }),
    [borderRadius, styles],
  );

  return (
    <Link
     className={`${className}`} style={memoizedStyles} {...props}>
      {children}
    </Link>
  );
}

export default NavLink;
