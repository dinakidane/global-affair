import { rest } from "msw";

const baseURL = "https://drf-trav-2076116b2ebe.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
        ctx.json({
            "pk": 3,
            "username": "dina",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 3,
            "profile_image": "https://res.cloudinary.com/dgq43ynzg/image/upload/v1/media/../default_profile_ky9c7z"
        })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];