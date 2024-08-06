import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req, res } = context;

    const response = await fetch(`${process.env.API_ORIGIN}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });
    if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // TODO: 他にも500エラーを考慮した分岐も必要
    const props = await response.json();
    return { props };
  };
};
