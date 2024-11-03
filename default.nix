{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.sqlitebrowser
  ];

  shellHook = ''
    echo "Welcome to the Nix shell with Node.js!"
    export MY_CUSTOM_VAR="some_value"
  '';
}
