import React, { useEffect, useState } from "react";
import { routes } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  Menu,
  Image,
  Container,
  Group,
  useMantineColorScheme,
  Button,
  Flex,
  Text,
  Avatar,
  Title,
} from "@mantine/core";
import { NAVBAR_HEIGHT } from "../../constants/theme-constants";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";
import radarLogo from "../../assets/maintenanceRadar.png";
import { UserDto } from "../../constants/types";
import { useAuth } from "../../authentication/use-auth";
import { createStyles } from "@mantine/emotion";


type PrimaryNavigationProps = {
  user?: UserDto;
};

type NavigationItem = {
  text: string;
  icon?: IconProp | undefined;
  hide?: boolean;
} & (
  | {
      nav: Omit<
        NavLinkProps,
        keyof React.AnchorHTMLAttributes<HTMLAnchorElement>
      >;
      children?: never;
    }
  | { nav?: never; children: NavigationItemForceNav[] }
);

export type NavigationItemForceNav = {
  text: string;
  icon?: IconProp | undefined;
  hide?: boolean;
  nav: NavLinkProps;
};

const navigation: NavigationItem[] = [
  { text: "Home", hide: false, nav: { to: routes.home } },
  { text: "User", hide: false, nav: { to: routes.user } },
  { text: "Settings", hide: false, nav: { to: routes.settings } },
  { text: "Maintenance Guide", hide: false, nav: { to: routes.maintenanceGuide } }, // 👈 new
  { text: "Maintenance Types", hide: true, nav: { to: routes.maintenancetypeListing } },
  { text: "Maintenance Tasks", hide: true, nav: { to: routes.maintenancetaskListing } },
  { text: "Manufacturers", hide: true, nav: { to: routes.manufacturerListing } },
  { text: "Models", hide: true, nav: { to: routes.modelListing } },
];

const DesktopNavigation = () => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();
  const [active, setActive] = useState(navigation[0].nav?.to.toString());

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Container px={0} className={classes.desktopNav}>
      <Flex direction="row" align="center" className={classes.fullHeight}>
        {navigation.filter(x => !x.hide).map((x, i) =>
          x.children ? (
            <Menu trigger="hover" key={i}>
              <Menu.Target>
                <Button size="md" className={classes.paddedMenuItem} variant="subtle">
                  {x.icon && <FontAwesomeIcon icon={x.icon} />} {x.text}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {x.children.filter(y => !y.hide).map(y => (
                  <Menu.Item key={y.text} to={y.nav.to} component={NavLink}>
                    <Flex direction="row">
                      <Text size="sm">{y.icon && <FontAwesomeIcon icon={y.icon} />} {y.text}</Text>
                    </Flex>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              size="md"
              component={NavLink}
              to={x.nav.to}
              className={cx(classes.paddedMenuItem, {
                [classes.linkActive]: active === x.nav.to,
              })}
              variant="subtle"
              key={i}
            >
              {x.icon && <FontAwesomeIcon icon={x.icon} />} {x.text}
            </Button>
          )
        )}
      </Flex>
    </Container>
  );
};

export const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({ user }) => {
  const { classes } = useStyles();
  const { logout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Title order={4}>
      <Container px={20} fluid>
        <Flex direction="row" justify="space-between" align="center">
          <Group>
            <Flex direction="row" align="center">
              <NavLink to={routes.root}>
                <Image
                  className={classes.logo}
                  w={180}
                  h={50}
                  radius="sm"
                  src={radarLogo}
                  alt="Maintenance Radar Logo"
                />
              </NavLink>
              {user && <DesktopNavigation />}
            </Flex>
          </Group>
          <Group>
            {user && (
              <Menu>
                <Menu.Target>
                  <Avatar className={classes.pointer}>
                    {user.firstName.substring(0, 1)}
                    {user.lastName.substring(0, 1)}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => toggleColorScheme()}>
                    {dark ? "Light mode" : "Dark mode"}
                  </Menu.Item>
                  <Menu.Item onClick={() => logout()}>Sign Out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Flex>
      </Container>
    </Title>
  );
};

const useStyles = createStyles((theme) => ({
  pointer: { cursor: "pointer" },
  logo: {
    cursor: "pointer",
    marginRight: "5px",
    paddingTop: "5px",
    height: NAVBAR_HEIGHT,
  },
  paddedMenuItem: { margin: "0px 5px" },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.variantColorResolver({
        theme,
        color: theme.primaryColor,
        variant: "light",
      }).background,
      color: theme.variantColorResolver({
        theme,
        color: theme.primaryColor,
        variant: "light",
      }).color,
    },
  },
  desktopNav: { height: NAVBAR_HEIGHT },
  fullHeight: { height: "100%" },
}));

export default PrimaryNavigation;