"use client";
import { useState, useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    window.location.href = "/photos";
  }, []);

  return null;
}
