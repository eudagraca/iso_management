module.exports = (requiredRoles) => (request, response, next) => {
  // request.session.currentUser.role = "supervisor";
  if (requiredRoles.indexOf(request.session.sessionID.role) === -1) {
    response
      .status(403)
      .render("error.pug", { error: { status: 403, stack: "Transação não permitida para este usuário", url: request.headers.referer },  message: 'Acesso proibido' });
    return;
  }
  next();
};
