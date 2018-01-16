defmodule GungameWeb.PageController do
  use GungameWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
