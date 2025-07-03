import { FiberManualRecord } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { colors } from "../../styles/colors";

interface MyBreadCrumbsProps {
  path: {
    title: string;
    href?: string;
  }[];
}

export const MyBreadCrumbs: React.FC<MyBreadCrumbsProps> = ({ path }) => {
  return (
    <Breadcrumbs
      separator={
        <FiberManualRecord style={{ color: colors.black, fontSize: 10 }} />
      }
      sx={{ margin: "10px 0 20px" }}
    >
      <NextLink href="/" passHref>
        <Link
          style={{
            fontSize: 14,
            color: colors.black,
            fontWeight: "bold",
            textDecoration: "unset",
          }}
        >
          Hovedsiden
        </Link>
      </NextLink>
      {path.map((p, index) =>
        index === path.length - 1 ? (
          <Link
            key={index}
            style={{
              fontSize: 14,
              color: colors.red,
            }}
          >
            {p.title}
          </Link>
        ) : (
          <NextLink key={index} href={p.href!} passHref>
            <Link
              style={{
                fontSize: 14,
                color: colors.black,
                fontWeight: "bold",
                textDecoration: "unset",
              }}
            >
              {p.title}
            </Link>
          </NextLink>
        )
      )}
    </Breadcrumbs>
  );
};
