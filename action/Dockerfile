FROM ghcr.io/ludeeus/devcontainer/python:3.9

WORKDIR /vais

RUN git clone --quiet --depth 1 https://github.com/Vioneta/vais-backend.git /vais
RUN git clone --quiet --depth 1 https://github.com/Vioneta/default.git /default

RUN python3 -m pip install vioneta-agro aiogithubapi > /dev/null
RUN bash /vais/manage/install_frontend > /dev/null

COPY ./action.py /vais/action.py

ENTRYPOINT ["python3", "/vais/action.py"]