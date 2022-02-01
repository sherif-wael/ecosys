import styled from "styled-components";
import Text from "components/lib/Text";
import { View, Delete } from "components/lib/IconButton";
import { useRemoveTopic } from "hooks/topics";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useTextMapper from "hooks/useTextMapper";
import { useTranslation } from "react-i18next";

function DeleteTopic({ topic, guidebookId }){
    const { mutate: remove, isLoading } = useRemoveTopic(guidebookId);
    const { t } = useTranslation();

    return (
        <Delete
            onClick={() => remove(topic)}
            question={t("deletingTopic")}
            disabled={isLoading}
        />
    )
}

function GuidebookTopics({ guidebookId, topics }){
    const mapText = useTextMapper();
    const { t } = useTranslation();

    return (
        <Wrapper>
            <TransitionGroup component={null}>
                {
                    topics.map(topic => (
                        <CSSTransition classNames="fadeleft" timeout={200} key={topic.id}>
                            <Topic>
                                <Text size="xxl" as="h4" className="order">{`${t("step")}-${topic.order}`}</Text>
                                <Text size="lg" as="p" className="name">{mapText(topic, "name")}</Text>
                                <Text size="sm" as="p" className="description">{mapText(topic, "description")}</Text>
                                <div className="actions">
                                    <View to={`/admin/topics/${topic.id}?guidebook_id=${guidebookId}`} />
                                    <DeleteTopic topic={topic} guidebookId={guidebookId} />
                                </div>
                            </Topic>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1200px;
    margin: 0 auto;
    grid-gap: 25px;
`;

const Topic = styled.div`
  padding: 16px 24px;
  background-color: #fff;
  border-radius: 10px;

  .order{
      margin: 0 0 8px;
  }

  .name{
    margin: 0 0 8px;
    font-weight: 500;
  }

  .actions{
      ${props => props.theme.mixins.flexVertCenter};
      justify-content: flex-end;

      & > *{
          margin-inline-end: 10px;
      }
  }
`;

export default GuidebookTopics;