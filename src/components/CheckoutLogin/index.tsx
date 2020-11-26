import "./scss/index.scss";

import React, { useContext } from "react";
import { NextPage } from "next";

import { useAuth } from "@saleor/sdk";
import { OfflinePlaceholder, Redirect } from "@components/atoms";
import { checkoutUrl } from "@temp/app/routes";

import { Offline, Online, OverlayContext } from "..";
import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";
import { OverlayType, OverlayTheme } from "../Overlay";

const CheckoutLogin: NextPage = () => {
  const overlay = useContext(OverlayContext);
  const { user } = useAuth();
  const { show } = overlay;

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  return user ? (
    <Redirect url={checkoutUrl} />
  ) : (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />
          <div className="checkout-login__user">
            <SignInForm onForgottenPasswordClick={showPasswordResetOverlay} />
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  );
};

export default CheckoutLogin;
