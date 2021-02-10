import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe("Pruebas en PrivateRoute", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };
  Storage.prototype.setItem = jest.fn();

  test("Debe de mostrar el componente si esta autenticado y guardar localStorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo</span>}
          {...props}
        />
      </MemoryRouter>
    );

    // console.log(wrapper);
    expect(wrapper.find("span").exists()).toBe(true);

    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("Debe de bloquear el componente di no esta authenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Listo</span>}
          {...props}
        />
      </MemoryRouter>
    );

    // console.log(wrapper);
    expect(wrapper.find("span").exists()).toBe(false);

    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });
});
